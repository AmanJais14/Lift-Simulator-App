let floors;
let lifts;
let liftPositions = [];

function handleSubmit() {
    floors = document.querySelector('#floor').value;
    lifts = document.querySelector('#lift').value;
    console.log(floors + " " + lifts);
    let container = document.getElementById('container')
    container.classList.add("hidden");
    let floorCont = document.querySelector(".floors")
    let building = document.querySelector(".building");
    building.classList.remove('hidden')
    for(let i = 0;i < floors;i++) {
        let parent  = document.createElement('div');
        parent.classList.add('flex')
        let div = document.createElement('div');
        let button = document.createElement('button');
        button.innerText = `Floor ${i}`
        button.addEventListener('click',() => callLift(i))
        button.classList.add("submit-button")
        div.classList.add('floorsDesign');

        parent.appendChild(button);
        parent.appendChild(div);
        floorCont.appendChild(parent);
    }
    createLift();
}

function createLift() {
    let liftCont = document.querySelector(".lifts");

    for(let i = 0;i < lifts;i++) {
        let lift = document.createElement('div');
        lift.classList.add('liftDesign')
        lift.style.left = `${i * 150}px`;
        // lift.style.transition = `bottom ${(i+1)*2}s, width ${2.5}s ease-in-out`
        let doorLeft = document.createElement('div');
        doorLeft.classList.add('door', 'door-left');
        let doorRight = document.createElement('div');
        doorRight.classList.add('door', 'door-right');
        
        lift.appendChild(doorLeft);
        lift.appendChild(doorRight);
        liftCont.appendChild(lift);
        liftPositions.push(0); 
    }
}

function callLift(floorIndex) {
    let nearestLiftIndex = 0;
    let minDistance = Math.abs(liftPositions[0] - floorIndex);

    for (let i = 1; i < liftPositions.length; i++) {
        let distance = Math.abs(liftPositions[i] - floorIndex);
        if (distance < minDistance) {
            minDistance = distance;
            nearestLiftIndex = i;
        }
    }

    let lift = document.querySelectorAll('.liftDesign')[nearestLiftIndex];
    let floorHeight = document.querySelector('.floorsDesign').offsetHeight;
    let targetPosition = floorIndex * floorHeight;

    // Move the lift
    // lift.style.transform = `translateY(-${targetPosition}px)`;
    let currentLiftPosition = liftPositions[nearestLiftIndex] * floorHeight;
    let distanceToCover = Math.abs(currentLiftPosition - targetPosition);
    let transitionTime = (distanceToCover / floorHeight) * 2;
    lift.style.transition = `bottom ${transitionTime}s, width 2.5s ease-in-out`
    lift.style.bottom = `${targetPosition}px`;

    liftPositions[nearestLiftIndex] = floorIndex; // Update lift's current floor

    setTimeout(() => {
        lift.classList.add('open-door');
        setTimeout(() => {
            lift.classList.remove('open-door');
        }, 2500);
    }, transitionTime * 1000);

}