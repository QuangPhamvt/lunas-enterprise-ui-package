import { useCallback } from 'react';

import { type CredentialResponse, GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google';

type GoogleProps = {
  /** When `true`, the Google One Tap prompt is suppressed and no login dialog is shown. */
  isDisabled: boolean;
  /** Callback invoked with the verified `CredentialResponse` after a successful Google sign-in. */
  onGoogleLoginSuccess?: (params: CredentialResponse) => void | Promise<void>;
};

/**
 * Headless component that activates Google One Tap login and forwards the credential response.
 *
 * Must be rendered inside a `GoogleOAuthProvider` (or use the default export {@link ReactOAuth}
 * which wraps this component automatically).
 *
 * @example
 * ```tsx
 * import { Google } from '@customafk/lunas-ui/systems/google';
 *
 * // Inside a GoogleOAuthProvider tree
 * <Google isDisabled={false} onGoogleLoginSuccess={(cred) => handleLogin(cred)} />
 * ```
 */
export const Google: React.FC<GoogleProps> = ({ isDisabled, onGoogleLoginSuccess }) => {
  const handleSignIn = useCallback(
    async (response: CredentialResponse) => {
      if (!response.clientId || !response.credential || !response.select_by) return;
      await onGoogleLoginSuccess?.({
        clientId: response.clientId,
        credential: response.credential,
        select_by: response.select_by,
      });
    },
    [onGoogleLoginSuccess]
  );
  useGoogleOneTapLogin({
    disabled: isDisabled,
    use_fedcm_for_prompt: false,
    onSuccess: handleSignIn,
  });
  return null;
};

type ReactOAuthProps = {
  /** Google OAuth 2.0 client ID from the Google Cloud Console. */
  clientId: string;
  /** When `true`, the Google One Tap prompt is suppressed. */
  isDisabled: boolean;
  /** Callback invoked with the verified `CredentialResponse` after a successful Google sign-in. */
  onGoogleLoginSuccess?: (params: CredentialResponse) => void | Promise<void>;
};

/**
 * Convenience wrapper that provides the `GoogleOAuthProvider` context and mounts the {@link Google}
 * One Tap component in a single step.
 *
 * @example
 * ```tsx
 * import ReactOAuth from '@customafk/lunas-ui/systems/google';
 *
 * <ReactOAuth
 *   clientId="YOUR_GOOGLE_CLIENT_ID"
 *   isDisabled={false}
 *   onGoogleLoginSuccess={(cred) => handleLogin(cred)}
 * >
 *   <App />
 * </ReactOAuth>
 * ```
 */
const ReactOAuth: React.FC<React.PropsWithChildren<ReactOAuthProps>> = ({ clientId, isDisabled, onGoogleLoginSuccess, children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
      <Google isDisabled={isDisabled} onGoogleLoginSuccess={onGoogleLoginSuccess} />
    </GoogleOAuthProvider>
  );
};

export default ReactOAuth;
