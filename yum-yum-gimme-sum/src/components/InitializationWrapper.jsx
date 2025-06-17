import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeTenant, fetchMenu } from '../features/menu/store/menuSlice';

const InitializationWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { tenantInitialized, loading, error } = useSelector(state => state.menu);
  const [isReady, setIsReady] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Starting app initialization...');
        
        if (!tenantInitialized) {
          console.log('Creating tenant...');
          await dispatch(initializeTenant('LauDingFoodTruck')).unwrap();
          console.log('Tenant created successfully');
        }
        
        console.log('Fetching menu...');
        await dispatch(fetchMenu()).unwrap();
        console.log('Menu fetched successfully');
        
        setIsReady(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setInitError(error);
      }
    };

    if (!isReady && !initError) {
      initializeApp();
    }
  }, [dispatch, tenantInitialized, isReady, initError]);

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Initialization Failed</h2>
          <p className="text-gray-600 mb-4">{initError}</p>
          <div className="space-y-2">
            <button 
              onClick={() => {
                setInitError(null);
                setIsReady(false);
              }}
              className="btn-primary w-full"
            >
              Retry Initialization
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="btn-secondary w-full"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Förbereder din foodtruck...</p>
          <p className="text-sm text-gray-400 mt-2">
            {!tenantInitialized ? 'Skapar tenant...' : 'Hämtar meny...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Något gick fel</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default InitializationWrapper; 