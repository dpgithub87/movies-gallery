const findByTestAttribute: Function = (component: any, attr: string) => {
    const wrapper: Array<any> = component.find(`${attr}`);
    return wrapper;
  };
  
  export default findByTestAttribute;
  