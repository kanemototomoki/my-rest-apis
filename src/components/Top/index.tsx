import type { FC } from "hono/jsx";
import Layout from "../Layout";

import type { Route } from "../types";

type Props = {
	routes: Route[];
};

const Top: FC<Props> = ({ routes }) => {
	return (
		<Layout>
			<h1>ルート一覧</h1>
			<ul>
				{routes.map(({ path, description }) => {
					return (
						<li key={path}>
							<code>path: {path}</code>
							<p>desc: {description}</p>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
};

export default Top;
