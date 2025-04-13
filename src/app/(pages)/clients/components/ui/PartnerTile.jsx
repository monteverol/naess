const PartnerTile = ({ svg, title, description }) => {
  return(
    <div className="bg-white p-4 rounded-lg shadow-sm w-full lg:w-[48%]">
      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          {svg}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default PartnerTile;