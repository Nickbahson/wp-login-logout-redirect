import React from 'react';
import { useState, useEffect } from '@wordpress/element';

import api from '@wordpress/api';

const FetchSettings = ( availableRoles ) => {
	const [ roles, setRoles ] = useState( availableRoles );
	const [ data, setData ] = useState( null );
	const [ error, setError ] = useState( null );

	useEffect( () => {
		api.loadPromise.then( () => {
			const apiSettings = new api.models.Settings();
			apiSettings
				.fetch()
				.then( ( res ) => {
					const data = JSON.parse( res.wplalr_login_logout_data ).map(
						( item ) => {
							item.roles = formatRoles( item.roles, roles );
							return item;
						}
					);
					setData( data );
				} )
				.catch( ( err ) => setError( err ) );
		} );
	}, [ roles ] );

	return { data, error };
};

const formatRoles = ( keys, roles ) => {
	if ( ! keys || ! roles ) return [];
	return [ ...roles ].filter( ( role ) => keys.includes( role.value ) );
};
export default FetchSettings;