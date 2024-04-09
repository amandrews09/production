// $(document).on('click', '.time-entry', function () {
//     const productId = $(this).data('product-id');
//     const controlsId = "#time-controls-" + productId;
//     $(controlsId).show();

//     const datepickerId = '#datepicker-' + productId;
//     $(datepickerId).removeAttr('hidden').datepicker({
//         dateFormat: 'yy-mm-dd', // Set the format that matches your server's expected format
//         onSelect: function (dateText) {
//             // Keep dateText in ISO format for consistency with server storage
//             fetch(`/api/products/${productId}`, {
//                 method: 'PUT',
//                 body: JSON.stringify({ selectedDate: dateText }),
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             const formattedDate = moment(dateText).format('ddd MMM DD YYYY');
//             console.log("Date selected for product " + productId + ": " + formattedDate);
//             $('#selected-date-' + productId).text("Selected Date: " + formattedDate);
//         }
//     }).datepicker('show');
// });

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

$(document).on('click', 'button.stop', async function () {
    const productId = $(this).data('product-id');
    const stopTime = moment().toISOString(); // Use ISO string for consistency

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ stopTime }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save stop time.');
        }

        const displayStopTime = moment(stopTime).format('ddd MMM DD YYYY HH:mm:ss');
        console.log("Stop time saved for product " + productId);
        $('#stop-time-' + productId).text("Stop Time: " + displayStopTime);
    } catch (error) {
        console.error(error.message);
    }
});


