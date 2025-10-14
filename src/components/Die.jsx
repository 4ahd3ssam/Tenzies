export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button
      style={styles}
      className="size-[80px] p-5 bg-white flex justify-center items-center rounded-md cursor-pointer shadow-md"
      onClick={props.holdDie}
    >
      <span className="text-gray-800 font-bold text-[30px]">{props.value}</span>
    </button>
  );
}
