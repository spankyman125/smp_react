import { useParams } from "react-router-dom";

export default function withRouter(WrappedComponent) {
  return (props) => {
    return <WrappedComponent {...props} params={useParams()} />
  }
}