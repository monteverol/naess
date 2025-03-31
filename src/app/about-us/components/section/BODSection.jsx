import { ChevronDown, ChevronUp } from 'lucide-react'

const BODSection = ({ leaders, expandedLeader, setExpandedLeader }) => {
  return(
    <section id="leadership" className="py-12 bg-gray-100 px-4 lg:px-20 xl:px-40">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#1A384F]">Leadership Team</h2>
        
        <div className="space-y-4">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedLeader(expandedLeader === leader.id ? null : leader.id)}
              >
                <div className="flex items-center">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{leader.name}</h3>
                    <p className="text-gray-600 text-sm">{leader.title}</p>
                  </div>
                </div>
                {expandedLeader === leader.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedLeader === leader.id && (
                <div className="px-4 pb-4">
                  <p className="text-gray-700">{leader.bio}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BODSection;