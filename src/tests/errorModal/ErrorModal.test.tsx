import { render, screen } from "@testing-library/react";
import { shallow, ShallowWrapper} from "enzyme";
import ErrorModal from "../../components/errorModal/ErrorModal";
import findByTestAttribute from "../../utils/findByTestAttribute";

const SetUp: Function = (props: Object = {}) => {
  const component: Object = shallow(<ErrorModal />);
  return component;
};

describe("Error modal", () => {
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
        //   render(<ErrorModal />);
        //   const headerText = screen.getByText(/Welcome to /i);
        //   const btnText = screen.getByText(/Continue/i);
    
        //   expect(headerText).toBeInTheDocument();
        //   expect(btnText).toBeInTheDocument();
        // });
    });
});