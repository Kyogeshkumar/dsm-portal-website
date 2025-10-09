<<<<<<< SEARCH
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    fetch('/api/sites')
      .then((res) => res.json())
      .then((data) => {
       console.log('Sites API response:', data);  // Debug
       setSites(data.sites || []);
     })
      .catch(() => setError('Failed to load sites'));
  }, [router]);
=======
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch sites from API
    fetch('/api/sites')
      .then((res) => {
        console.log('Sites API status:', res.status);
        return res.json();
      })
      .then((data) => {
        console.log('Sites API response:', data);
        console.log('Sites data type:', typeof data);
        console.log('Sites array:', data.sites);
        
        if (data.sites && Array.isArray(data.sites)) {
          console.log('Setting sites, count:', data.sites.length);
          setSites(data.sites);
        } else {
          console.error('Invalid sites data format:', data);
          // Fallback to demo data if API fails
          setSites([
            { site_id: 'REWA_01', site_name: 'REWA Ultra Mega Solar Park' },
            { site_id: 'BHADLA_02', site_name: 'Bhadla Solar Park Phase II' },
            { site_id: 'PAVAGADA_03', site_name: 'Pavagada Solar Park' },
            { site_id: 'KAMUTHI_04', site_name: 'Kamuthi Solar Power Station' }
          ]);
        }
      })
      .catch((err) => {
        console.error('Sites fetch error:', err);
        setError('Failed to load sites - using demo data');
        // Fallback demo sites
        setSites([
          { site_id: 'REWA_01', site_name: 'REWA Ultra Mega Solar Park' },
          { site_id: 'BHADLA_02', site_name: 'Bhadla Solar Park Phase II' }
        ]);
      });
  }, [router]);
>>>>>>> REPLACE
