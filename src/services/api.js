const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'
let apiKey = ''
let tenantId = '' // Cache for tenantId

const fetchApiKey = async () => {
  try {
    // Only fetch a new key if we don't have one
    if (apiKey) return apiKey

    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' })
    if (!response.ok) throw new Error('Could not fetch API key')
    const data = await response.json()
    apiKey = data.key
    return apiKey
  } catch (error) {
    console.error('Failed to fetch API key:', error)
    throw new Error('Could not fetch API key')
  }
}

const getTenantId = async () => {
  try {
    if (tenantId) return tenantId

    const key = await fetchApiKey()
    const response = await fetch(`${BASE_URL}/tenants`, {
      method: 'POST',
      headers: { 'x-zocom': key },
      body: JSON.stringify({ tenant: 'Yum Yum Gimme Sum' }),
    })
    if (!response.ok) throw new Error('Could not create tenant')
    const data = await response.json()
    tenantId = data.tenantId
    return tenantId
  } catch (error) {
    console.error('Failed to get Tenant ID:', error)
    throw new Error('Could not get Tenant ID')
  }
}

const getMenu = async () => {
  try {
    const key = await fetchApiKey()
    const response = await fetch(`${BASE_URL}/menu`, {
      method: 'GET',
      headers: { 'x-zocom': key },
    })
    if (!response.ok) throw new Error('Could not fetch menu')
    const data = await response.json()
    return data.menu
  } catch (error) {
    console.error('Failed to fetch menu:', error)
    throw new Error('Could not fetch menu')
  }
}

const postOrder = async (items) => {
  try {
    const key = await fetchApiKey()
    const tId = await getTenantId()
    const order = {
      tenantId: tId,
      items: items.map(item => ({
        id: item.id,
        quantity: item.quantity,
      }))
    }

    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'x-zocom': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`Could not place order: ${errorBody.message || 'Unknown error'}`);
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to post order:', error)
    throw error
  }
}

// We will add postOrder later
const apiService = {
  getMenu,
  postOrder,
}

export default apiService 