// import errorImg from "../../images/image 70.png";
import {useRouteError, isRouteErrorResponse, Link} from "react-router-dom";
import Lottie from "lottie-react";
import notFound from "../../lottie/notFound.json";

export default function Notfound() {
	const error = useRouteError();
	const [errorStatus, errorText] = isRouteErrorResponse(error) ? [error.status, error.statusText] : [404, "Page not found"];
	return (
		<>
			<div>
				<h1 style={{textAlign: "center"}}>
					Error: {errorStatus} - {errorText}
				</h1>
			</div>
			<div style={{display: "flex", justifyContent: "center", fontSize: "1.5rem", alignItems: "center"}}>
				<Link to='/' replace={true}>
					<h2>Home</h2>
				</Link>
			</div>
			<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
				<Lottie animationData={notFound} style={{width: "30%", height: "30%"}} />
			</div>
		</>
	);
}
