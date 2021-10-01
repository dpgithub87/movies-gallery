import { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import { HomePagePropsType } from "../../types/types";

const Home: FunctionComponent<PropsWithChildren<HomePagePropsType>> = ({
    history
  }): ReactElement => {

    return (
        <>
            <div>Home page</div>
        </>
    );
  };

  export default Home;