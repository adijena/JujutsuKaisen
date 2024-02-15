const CharacterCard = ({ name, image, onClick }) => {
  return (
    <div className="rounded-xl bg-white h-14 w-14 shadow-md shadow-gray-400 relative group"
    onClick={onClick}>
      <span className="absolute transition opacity-0 group-hover:opacity-100 group-hover:-translate-x-16 bg-slate-700 py-1 px-2 text-[10px] font-medium rounded-xl top-3 right-1">{name.toUpperCase()}</span>
      <img src={image} alt={name} className="w-full h-full object-fill rounded-xl" />
    </div>
  );
};
export default CharacterCard;
