import { Star } from 'lucide-react';

const TestimonialTile = ({ image, name, position, text}) => {
  return(
    <div className="bg-white w-full lg:w-[48%] p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover mr-4" 
        />
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-gray-600">{position}</p>
        </div>
      </div>
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 italic">{text}</p>
    </div>
  );
}

export default TestimonialTile;