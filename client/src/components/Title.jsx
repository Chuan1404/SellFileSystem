const Title = ({ title = "Title", children, ...props }) => {
    document.title = "DevChu - " +  title;
    return ({...children});
  };
  
  export default Title;