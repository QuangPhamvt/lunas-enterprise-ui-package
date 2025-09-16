import { useCallback } from 'react'

import { type CredentialResponse, GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google'

type GoogleProps = {
  isDisabled: boolean
  onGoogleLoginSuccess?: (params: CredentialResponse) => void | Promise<void>
}
export const Google: React.FC<GoogleProps> = ({ isDisabled, onGoogleLoginSuccess }) => {
  const handleSignIn = useCallback(
    async (response: CredentialResponse) => {
      if (!response.clientId || !response.credential || !response.select_by) return
      await onGoogleLoginSuccess?.({
        clientId: response.clientId,
        credential: response.credential,
        select_by: response.select_by,
      })
    },
    [onGoogleLoginSuccess],
  )
  useGoogleOneTapLogin({
    disabled: isDisabled,
    use_fedcm_for_prompt: false,
    onSuccess: handleSignIn,
  })
  return null
}

type ReactOAuthProps = {
  clientId: string
  isDisabled: boolean
  onGoogleLoginSuccess?: (params: CredentialResponse) => void | Promise<void>
}
const ReactOAuth: React.FC<React.PropsWithChildren<ReactOAuthProps>> = ({ clientId, isDisabled, onGoogleLoginSuccess, children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
      <Google isDisabled={isDisabled} onGoogleLoginSuccess={onGoogleLoginSuccess} />
    </GoogleOAuthProvider>
  )
}

export default ReactOAuth
