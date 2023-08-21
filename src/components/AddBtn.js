function AddBtn({ children, setshowModel }) {
  const clickH = (e) => {
    e.stopPropagation();
    setshowModel(true);
  };
  return (
    <button type="button" className="btn" onClick={clickH}>
      {children}
    </button>
  );
}

export default AddBtn;
