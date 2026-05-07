
const testRemove = async () => {
    try {
        // 1. First list products to get an ID (optional, but good for real testing)
        // For now, we just send a fake ID to see if the server logs it. 
        // We only care if the server RECEIVES the ID.
        
        const payload = {
            id: "fake_id_12345" 
        };

        console.log("Sending payload:", payload);

        const response = await fetch('http://127.0.0.1:4000/api/product/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // IMPORTANT!
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("Response from server:", result);
        
        if (result.success) {
            console.log("TEST PASSED: Server accepted the JSON request.");
        } else {
            console.log("TEST FAILED: Server returned error:", result.message);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

testRemove();
