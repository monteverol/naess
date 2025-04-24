import PartnerTile from "../ui/PartnerTile";

const PartnerBenefitsSection = ({ partnershipBenefits }) => {
  return(
    <section className="section bg-gray-50 grid items-center justify-center">
      <div className="section-inner-width">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Why Partner With Us?</h2>
        
        <div className="flex flex-wrap gap-4 justify-between w-full">
          {
            partnershipBenefits.map((item, index) => (
              <PartnerTile
                key={index}
                svg={item.svg}
                title={item.title}
                description={item.description}
              />
            ))
          }
        </div>
      </div>
    </section>
  );
}

export default PartnerBenefitsSection;