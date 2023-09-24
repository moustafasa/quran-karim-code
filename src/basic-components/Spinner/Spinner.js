import sass from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={sass.spinnerCont}>
      <div className={sass.spinner}></div>
      <p className={sass.label}>جاري التحميل...</p>
    </div>
  );
};

export default Spinner;
