function attemptSendEvent(eventType: string, eventParams: object, retries = 20, interval = 100) {
    let attempts = 0;

    function sendEvent() {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', eventType, eventParams);
            //console.log(`${eventType} event sent`);
        } else if (attempts < retries) {
            attempts++;
            setTimeout(sendEvent, interval);
        } else {
            console.error(`Facebook Pixel is not initialized after ${retries} attempts.`);
        }
    }

    sendEvent();
}

export function fbqViewContent(    contentName: string, contentCategory: string, contentIds: string[]
    //, value: number = 0, currency: string = 'USD'
) {
    const eventParams = {
        content_name: contentName,
        content_category: contentCategory,
        content_ids: contentIds,
        // value: value,
        // currency: currency,
    };
    attemptSendEvent('ViewContent', eventParams);
}

export function fbqLeadEvent(status: string = 'submitted', value: number = 10, currency: string = 'USD') {
    const eventParams = {
        status: status, // e.g., 'completed', 'submitted'
        value: value,   // Optional: monetary value associated with the lead
        currency: currency // Default is USD
    };
    attemptSendEvent('Lead', eventParams);
}