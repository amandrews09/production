// Time.js

$(document).on('click', 'button.start', async function () {
    const productId = $(this).data('product-id');
    const startTime = moment().toISOString(); // Use ISO string for consistency with server storage

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ startTime }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save start time.');
        }

        const displayStartTime = moment(startTime).format('ddd MMM DD YYYY HH:mm:ss');
        console.log("Start time saved for product " + productId);
        $('#start-time-' + productId).text("Start Time: " + displayStartTime);
    } catch (error) {
        console.error(error.message);
    }
});

// $(document).on('click', 'button.stop', async function () {
//     const productId = $(this).data('product-id');
//     const stopTime = moment().toISOString(); // Use ISO string for consistency

//     try {
//         const response = await fetch(`/api/products/${productId}`, {
//             method: 'PUT',
//             body: JSON.stringify({ stopTime }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Failed to save stop time.');
//         }

//         const displayStopTime = moment(stopTime).format('ddd MMM DD YYYY HH:mm:ss');
//         console.log("Stop time saved for product " + productId);
//         $('#stop-time-' + productId).text("Stop Time: " + displayStopTime);
//     } catch (error) {
//         console.error(error.message);
//     }
// });

$(document).on('click', 'button.stop', async function () {
    const productId = $(this).data('product-id');
    const stopTime = moment().toISOString(); // Prepare stopTime

    try {
        // First, update stopTime in the database
        let response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ stopTime }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to save stop time.');
        }

        const displayStopTime = moment(stopTime).format('ddd MMM DD YYYY HH:mm:ss');
        console.log("Stop time saved for product " + productId);
        $('#stop-time-' + productId).text("Stop Time: " + displayStopTime);

        // Stop time update was successful; now fetch the product details
        response = await fetch(`/api/products/${productId}`);


        if (!response.ok) {
            throw new Error('Failed to fetch product details.');
        }

        const productDetails = await response.json();
        // Ensure that `startTime` exists and is valid
        if (!productDetails.startTime) {
            throw new Error('Start time is missing or invalid.');
        }

        // Calculate duration using the fetched startTime and the recently saved stopTime
        const duration = calculateDuration(productDetails.startTime, stopTime);

        // Display the duration
        displayDuration(productId, duration);

    } catch (error) {
        console.error('Error:', error);
    }
});

function calculateDuration(startTime, stopTime) {
    // Directly use ISO 8601 strings with Moment.js
    const startMoment = moment(startTime);
    const stopMoment = moment(stopTime);

    console.log(startTime, stopTime)

    const duration = moment.duration(stopMoment.diff(startMoment));
    return {
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
    };
}


function displayDuration(productId, { hours, minutes, seconds }) {
    const durationFormatted = `${hours} hours ${minutes} minutes ${seconds} seconds`;
    $('#duration-' + productId).text("Duration: " + durationFormatted);
}



