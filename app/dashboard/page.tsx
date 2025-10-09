.then((data) => {
       console.log('Sites API response:', data);  // Debug
       setSites(data.sites || []);
     })
