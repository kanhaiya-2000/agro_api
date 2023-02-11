const express = require("express");
// const { createReport, getAggregateReport } = require("../controllers/ReportController");
const router = express.Router();

const sensorData = [
    {
        name:"Alarm clock",
        batteryStatus:"60%",
        healthStatus:"100%",
        id:1,
        category:"IOT-SENSORS",
        description:"Alarm clocks in aircraft typically refer to the warning systems that alert the crew to potential issues or malfunctions in the aircraft. These warning systems are designed to provide timely and clear information to the crew, so they can take the necessary actions to resolve the issue and ensure the safe operation of the aircraft.\
        \
        The alarms in an aircraft can be triggered by a variety of sensors, such as pressure sensors, temperature sensors, and attitude sensors. For example, a pressure sensor can trigger an alarm if it detects a drop in cabin pressure, alerting the crew to a possible leak. Similarly, a temperature sensor can trigger an alarm if it detects an excessive increase in temperature, indicating a potential fire or overheating in the aircraft.",
        searialNo:1,
        image:"https://cdn.shopify.com/s/files/1/0400/5268/7000/products/QHK035R_basic_r2_1024x.png?v=1661836315"
    },
    {
        name:"Thermal sensor",
        batteryStatus:"80%",
        healthStatus:"90%",
        category:"IOT-SENSORS",
        id:2,
        searialNo:2,
        description:"A thermal sensor is a device that measures temperature by detecting changes in thermal energy. There are several types of thermal sensors, including thermocouples, resistance temperature detectors (RTDs), thermistors, and infrared thermometers. Each type of thermal sensor works on a different principle and has its own unique characteristics and advantages.",
        image:"https://in.element14.com/productimages/large/en_GB/3406468-40.jpg"
    },
    {
        name:"Manometer",
        batteryStatus:"100%",
        category:"IOT-SENSORS",
        healthStatus:"50%",
        id:3,
        description:"A manometer is an instrument used to measure pressure or vacuum in a fluid-filled system. It works on the principle of fluid statics, which states that the pressure in a fluid at rest is proportional to its height. In a manometer, a column of fluid (usually water or mercury) is used to measure the pressure difference between two points in a system. The pressure difference causes a change in the height of the fluid column, which can then be read and converted into a pressure measurement.",
        searialNo:3,
        image:"https://static4.depositphotos.com/1000356/357/i/600/depositphotos_3576213-stock-photo-manometer.jpg"
    },
    {
        name:"Internal Hygrometer",
        batteryStatus:"80%",
        healthStatus:"90%",
        description:"A hygrometer is a device used to measure the relative humidity of the air. Relative humidity is the amount of moisture in the air compared to the maximum amount of moisture the air can hold at a specific temperature. High humidity can cause discomfort, as well as promote the growth of mold and mildew, while low humidity can lead to dry skin and respiratory issues. Hygrometers can be used in various applications, such as weather monitoring, HVAC systems, and indoor air quality control.",
        category:"IOT-SENSORS",
        id:4,
        searialNo:4,
        image:"https://4.imimg.com/data4/QL/YU/MY-19578709/thermometer-and-hygrometer-for-indoor-and-outdoor-500x500.jpg"
    },
    {
        name:"Internal Vibrometer",
        batteryStatus:"100%",
        healthStatus:"50%",
        category:"IOT-SENSORS",
        description:"A vibrometer is an instrument used to measure vibrations or oscillations of an object. These vibrations can be caused by various factors such as mechanical, electrical, or acoustical, and can be measured in different ways, including displacement, velocity, and acceleration. Vibrometers can be used in a variety of fields, such as mechanical engineering, manufacturing, and structural analysis, to monitor and control the vibration of machinery, structures, and other objects. There are various types of vibrometers, including laser vibrometers, accelerometer-based vibrometers, and impedance vibrometers, each with its own advantages and disadvantages. The choice of vibrometer will depend on the specific application and requirements of the measurement.        ",
        id:5,
        searialNo:5,
        image:"https://cdn-aofpk.nitrocdn.com/YitYRMTCUBGcutxIgFHMyZTUGRrrLVMy/assets/static/optimized/rev-1852667/wp-content/uploads/MTI_PBS_Unit_Angled-1.png"
    },
    {
        name:"Voltmeter",
        batteryStatus:"80%",
        category:"IOT-SENSORS",
        description:"A voltmeter is an electrical measuring device used to measure the voltage (electrical potential difference) between two points in an electrical circuit. It is commonly used to measure the voltage drop across a component or across a point in a circuit. A voltmeter is connected in parallel with the component or circuit point being measured and typically displays the voltage in volts (V). The accuracy of the measurement depends on the design and calibration of the voltmeter. Digital voltmeters are now commonly used, but analog voltmeters are still available and have a traditional, classic look.",
        healthStatus:"90%",
        id:6,
        searialNo:6,
        image:"https://5.imimg.com/data5/KM/VT/MY-12987697/analog-dc-voltmeter-500x500.jpg"
    }
]

router.get("/sensors",(req,res)=>{
    
    res.status(200).json(sensorData);
});
router.get("/sensor/:sensorid",(req,res)=>{
    const {sensorid} = req.params;
    const numsensor = parseInt(sensorid);
    switch(numsensor){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            res.json({data:sensorData[numsensor-1]})
            return;
        default:
            res.json({
                message:"Invalid sensor id"
            })
    }
});

module.exports = router;