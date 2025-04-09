-- Fonction qui sera appelée par le déclencheur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || SUBSTRING(NEW.id::text, 1, 8)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Déclencheur qui s'active après l'insertion d'un nouvel utilisateur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour supprimer le profil lorsqu'un utilisateur est supprimé
CREATE OR REPLACE FUNCTION public.handle_user_delete()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.profiles WHERE id = OLD.id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Déclencheur qui s'active après la suppression d'un utilisateur
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_delete();

ALTER TABLE public.profiles DROP CONSTRAINT profile_avatar_url_key;
-- Créer une fonction qui mettra à jour le profil utilisateur lorsqu'un avatar est téléchargé
CREATE OR REPLACE FUNCTION public.handle_avatar_upload()
RETURNS TRIGGER AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Extraire l'ID utilisateur à partir du chemin du fichier
  -- Supposons que les avatars sont stockés avec un chemin comme 'avatars/{user_id}.jpg'
  user_id := (regexp_match(NEW.name, 'avatars/([0-9a-f-]+)\..*'))[1]::UUID;
  
  -- Mettre à jour l'URL de l'avatar pour cet utilisateur
  IF user_id IS NOT NULL THEN
    UPDATE public.profiles 
    SET avatar_url = '/storage/v1/object/public/' || NEW.bucket_id || '/' || NEW.name
    WHERE id = user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer un déclencheur sur la table storage.objects
CREATE TRIGGER on_avatar_upload
  AFTER INSERT ON storage.objects
  FOR EACH ROW
  WHEN (NEW.name ~ '^avatars/.*')
  EXECUTE FUNCTION public.handle_avatar_upload();