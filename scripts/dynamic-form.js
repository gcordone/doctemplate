// Configuration object for endpoints
const apiConfig = {
    custom1: {
      url: 'https://api.yourdomain.com/v1/custom1',
      params: {
        param1: { type: 'text', placeholder: 'Example 1', description: 'Description for param1' },
        param2: { type: 'number', placeholder: '10', description: 'Number of items to fetch' }
      }
    },
    custom2: {
      url: 'https://api.yourdomain.com/v1/custom2',
      params: {
        locale: { type: 'text', placeholder: 'en_US', description: 'Locale for the request' },
        limit: { type: 'number', min: 1, max: 50, placeholder: '20', description: 'Limit of results' },
        offset: { type: 'number', min: 0, placeholder: '0', description: 'Offset for pagination' }
      }
    }
  };
  
  function updateForm(endpointKey) {
    const config = apiConfig[endpointKey];
    const form = document.getElementById('apiForm');
    form.innerHTML = ''; // Clear previous form fields
  
    if (!config) {
      form.innerHTML = '<p>Endpoint configuration not found.</p>';
      return;
    }
  
    for (const [param, options] of Object.entries(config.params)) {
      const label = document.createElement('label');
      label.textContent = `${param} (${options.description})`;
      
      const input = document.createElement('input');
      input.name = param;
      input.type = options.type || 'text';
      input.placeholder = options.placeholder || '';
      if (options.min) input.min = options.min;
      if (options.max) input.max = options.max;
  
      form.appendChild(label);
      form.appendChild(input);
    }
  }
  
  async function tryApi(endpointKey) {
    const config = apiConfig[endpointKey];
    let url = config.url;
  
    const params = {};
    for (const [param, options] of Object.entries(config.params)) {
      const value = document.querySelector(`input[name="${param}"]`).value;
      if (value) params[param] = value;
    }
  
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
  
    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
      document.getElementById('responseSample').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
      document.getElementById('responseSample').innerText = 'Error fetching data';
    }
  }
  
  // Initialize form based on the URL hash (e.g., #custom1)
  document.addEventListener('DOMContentLoaded', () => {
    const endpointKey = window.location.hash.substring(1);
    updateForm(endpointKey || 'custom1');
  });
  