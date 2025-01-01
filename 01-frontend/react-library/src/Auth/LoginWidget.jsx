import { useNavigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import SpinnerLoading from "../utils/SpinnerLoading"
import OktaSignInWidget from "./OktaSignInWidget";

export default function LoginWidget({ config }){
    const { oktaAuth, authState } = useOktaAuth()
    const onSuccess = (tokens) => oktaAuth.handleLoginRedirect(tokens)
    const onError = (err) => console.log("Sign in error: ", err)
    const navigate = useNavigate()

    if(!authState) {
        return (
            <SpinnerLoading />
        )
    }

    if (authState.isAuthenticated) {
        setTimeout(() => navigate("/", { replace: true }), 0);
        return null;
    }

    return (
        <OktaSignInWidget
            config={config}
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}