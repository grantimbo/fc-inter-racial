interface IPhoneProps {
  color?: string;
  children?: React.ReactNode;
}

const IPhone17Template: React.FC<IPhoneProps> = ({ color = "#2c2c2e", children }) => {
  return (
    <div className="relative inline-block">
      <svg width="400" height="680" viewBox="0 0 400 680" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Frame */}
        <rect x="50" y="20" width="300" height="620" rx="55" fill={color} stroke="#1a1a1a" strokeWidth="2"/>
        
        {/* Screen Bezel */}
        <rect x="58" y="28" width="284" height="604" rx="48" fill="#000000"/>
        
        {/* Dynamic Island */}
        <rect x="145" y="45" width="110" height="28" rx="14" fill="#1a1a1a"/>
        
        {/* Buttons */}
        <rect x="46" y="140" width="4" height="30" rx="2" fill="#444"/>
        <rect x="350" y="210" width="4" height="90" rx="2" fill="#444"/>

        {/* ForeignObject allows you to put HTML/React inside the SVG screen */}
        <foreignObject x="65" y="35" width="270" height="590">
          <div style={{ width: '100%', height: '100%', borderRadius: '42px', overflow: 'hidden',}}>
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};


export default function News() {
  return (
    <section className="bg-[#f5f6f7] py-16 px-4 font-sans text-black" id='news'>
      <div className="max-w-6xl mx-auto text-center">
 

        <div className="flex justify-center items-center gap-12">

        <IPhone17Template>
          <div 
            className="fb-page" 
            data-href="https://www.facebook.com/fcinterracial" 
            data-tabs="timeline" 
            data-width="300px" 
            data-height="600px" 
            data-small-header="false" 
            data-adapt-container-width="true" 
            data-hide-cover="true" 
            data-show-facepile="true"
          >
            <blockquote cite="https://www.facebook.com/fcinterracial" className="fb-xfbml-parse-ignore">
              <a href="https://www.facebook.com/fcinterracial">FC Inter Racial</a>
            </blockquote>
          </div>
        </IPhone17Template>

        {/* Changed 'text-left' to 'flex flex-col items-center' to ensure the button also centers */}
        <div className="text-left">
          <h2 className="text-6xl font-black mb-4 tracking-tight text-black">
            Don't miss a beat.
          </h2>
          <p className="text-xl">
            Catch all our latest updates over on Facebook.
          </p>

          <a href="https://facebook.com/fcinterracial" className="block mt-8 w-fit bg-gray-100 hover:bg-gray-300 text-black font-bold py-4 px-10 transition-transform hover:scale-105 uppercase tracking-widest text-sm rounded-md outline-3 outline-black">
            Visit Page
          </a>
        </div>
      </div>
      </div>
    </section>
  );
};