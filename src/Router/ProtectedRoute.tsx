import { Navigate } from "react-router-dom";
import { isAuth } from "../Helpers/Auth";
import {Component} from "react";

export class ProtectedRoute extends Component<{ children: any }> {
    render() {
        let {children} = this.props;
        const user = isAuth();
        if (!user) {
            // user is not authenticated
            return <Navigate to="/login"/>;
        }
        return children;
    }
}