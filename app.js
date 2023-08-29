const selectElement = (id) => {
    return document.getElementById(id);
}

const animate=()=>{
    gsap.fromTo('#planetImg', { y: -100, x:-300, rotate:-10,  opacity:0, scale:0.4}, { y: 0,x:0, duration: 1, opacity:1 , scale:1, rotate:0})

    gsap.fromTo('#planet', {opacity:0, scaleY:0, y:-60},{opacity:1,y:0,scaleY:1, duration:0.5})

}

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

const toggleMenu = document.getElementById('menu-toggle');
const mobileNavLinks = document.getElementById('mobile-nav');
const planet = selectElement("planet");
const overview = selectElement("overview");
const planetImg = selectElement("planetImg");
const rotation = selectElement("rotation");
const revolution = selectElement("revolution");
const radius = selectElement("radius");
const temp = selectElement("temp");
const url = selectElement('url')
const liList = document.querySelectorAll('li');
const apiUrl = "./assets/data.json";
const ElemntNav = document.querySelectorAll('.navLinks')

const switchMenu = () => {
    
        mobileNavLinks.classList.toggle('hidden')
        if (mobileNavLinks.classList.contains('hidden')) {
            toggleMenu.innerHTML = `   <svg
            clip="h-20	"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>`
        } else {
            toggleMenu.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            `
        
    }
}

toggleMenu.addEventListener('click', switchMenu)


document.addEventListener('DOMContentLoaded', function () {

    const updateContent = (data) => {
        updateInitialContent(data);


      
        ElemntNav.forEach(item => {



            item.addEventListener('click', () => {


                const section = item.getAttribute('data-name');

                if (section === "overview" || section === "overview-two") {
                    overview.textContent = data.overview.content;
                    planetImg.src = data.images.planet;

                } else if (section === "structure" || section === "structure-two") {
                    overview.textContent = data.structure.content;
                    planetImg.src = data.images.internal;
                    animate()

                } else if (section === "geology" || section === "geology-two") {
                    overview.textContent = data.geology.content;
                    planetImg.src = data.images.geology;
                    animate()

                }
                rotation.textContent = data.rotation;
                revolution.textContent = data.revolution;
                radius.textContent = data.radius;
                temp.textContent = data.temperature;
            });
        });
    };

    fetchData(apiUrl)
        .then(data => {
            console.log("Successfully Fetched data:", data);

            // Set initial content for the first planet
            updateInitialContent(data[0]);

            liList.forEach((ele, index) => {

                ele.addEventListener('click', function () {
                    const selectedData = data[parseInt(ele.dataset.index)];
                    switchMenu()

                    updateContent(selectedData);
                    animate()
                });
            });
            // Call updateContent to set up event listeners for all sections
            updateContent(data[0]);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });

    
    
        const updateInitialContent = (data) => {

            animate()

        planet.textContent = data.name;
        overview.textContent = data.overview.content;
        rotation.textContent = data.rotation;
        revolution.textContent = data.revolution;
        radius.textContent = data.radius;
        temp.textContent = data.temperature;
        planetImg.src = data.images.planet;
        let urlUpdate = (data) => {

                url.href = `https://en.wikipedia.org/wiki/${data.name}`

        }
        urlUpdate(data)

     };
});

