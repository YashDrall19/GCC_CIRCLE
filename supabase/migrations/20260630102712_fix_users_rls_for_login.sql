-- Drop the existing SELECT policy that requires authentication
DROP POLICY IF EXISTS select_users_admin ON users;

-- Create new policy that allows anon to select (needed for login)
CREATE POLICY "select_users_login" ON users FOR SELECT
  TO anon, authenticated USING (true);