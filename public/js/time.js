// Start button functionality
$(document).on('click', 'button.start', async function () {
    const productId = $(this).data('product-id');
    const startTime = moment().toISOString(); // Use ISO string for consistency with server storage

    try {
        // Update startTime in the database
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ startTime }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save start time.');
        }
      
        // Display startTime in readable format in UI
        const displayStartTime = moment(startTime).format('ddd MMM DD YYYY HH:mm:ss');

        console.log("Start time saved for product " + productId);
        $('#start-time-' + productId).text("Start Time: " + displayStartTime);
    } catch (error) {
        console.error(error.message);
    }
});

// Stop button functionality
$(document).on('click', 'button.stop', async function () {
    const productId = $(this).data('product-id');
    const stopTime = moment().toISOString(); // Use ISO string for consistency with server storage

    try {
        // Update stopTime in the database
        let response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ stopTime }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to save stop time.');
        }
        // Display stopTime in readable format in UI
        const displayStopTime = moment(stopTime).format('ddd MMM DD YYYY HH:mm:ss');
      
        console.log("Stop time saved for product " + productId);
        $('#stop-time-' + productId).text("Stop Time: " + displayStopTime);

        // Fetch the product details for duration calculation
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

// Calculate duration using the fetched startTime and the recently saved stopTime
function calculateDuration(startTime, stopTime) {
    // Directly use ISO strings with Moment.js
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

// Display the duration and send value to the database
async function displayDuration(productId, { hours, minutes, seconds }) {
    const durationFormatted = `${hours} hours ${minutes} minutes ${seconds} seconds`;
    $('#duration-' + productId).text("Duration: " + durationFormatted);

    try {
        // Send the duration to the server to be stored in the database
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ duration: durationFormatted }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to update duration.');
        }

        const data = await response.json();
        console.log('Duration updated successfully:', data);
    } catch (error) {
        console.error('Error updating duration:', error);
    }
}



