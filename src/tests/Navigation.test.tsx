

import { render, screen } from "@testing-library/react";
import { shallow, ShallowWrapper} from "enzyme";
import Navigation from "../components/navigation/Navigation";
import findByTestAttribute from "../utils/findByTestAttribute";

const SetUp: Function = (props: Object = {}) => {
  const component: Object = shallow(<Navigation />);
  return component;
};

describe("Navigation page", () => {
  let component: Object;
  beforeEach(() => {
    component = SetUp();
  });

  describe("Classes and properties checks", () => {
        // test("Should have .page class", () => {
        // const wrapper: Array<any> = findByTestAttribute(component, ".page");
        // expect(wrapper.length).toBe(1);
        // });

        // test("Should have .mainpage class", () => {
        // const wrapper: Array<any> = findByTestAttribute(component, ".mainpage");
        // expect(wrapper.length).toBe(1);
        // });
    });

    describe("Component text checks tests:", () => {
        // test("Should render the correct text.", () => {
        //   render(<Navigation />);
        //   const headerText = screen.getByText(/Welcome to /i);
        //   const btnText = screen.getByText(/Continue/i);
    
        //   expect(headerText).toBeInTheDocument();
        //   expect(btnText).toBeInTheDocument();
        // });
    });
});