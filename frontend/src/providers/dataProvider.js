import axiosInstance from '../constants/axiosInstance'
import { stringify } from 'query-string';

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const pagination = `limit=${perPage}&offset=${(page - 1) * perPage}`

        const { field, order } = params.sort;
        const ordering = `ordering=${order === 'DESC' ? '-' : '' }${field}`

        

        const query = {
            // limit: perPage,
            // offset: (page - 1) * perPage,
            // ordering: `${order === 'DESC' ? '-' : '' }${field}`,
            ...params.filter
        }
        console.log(query, params)

        return axiosInstance(`/${resource}?${stringify(query)}`).then(({ data }) => ({
        // return axiosInstance(`/${resource}`).then(({ data }) => ({
            data: data.results,
            total: data.total,
        }));
    },

    getOne: (resource, params) =>
        axiosInstance(`/${resource}/${params.id}`).then(({ data }) => ({
            data: data,
        })),

    getMany: (resource, params) => {
        const formated_ids = params.ids.map( id => `${id},` )
        return axiosInstance
                .get(`/${resource}?id__in=${formated_ids}`)
                .then( ({ data, total }) => ({ data: data.results , total: total }) ) ;
    },

    getManyReference: (resource, params) => {
        
        const { page, perPage } = params.pagination
        // const pagination = `limit=${perPage}&offset=${(page - 1) * perPage}`

        const { field, order } = params.sort;
        // const ordering = `ordering=${order === 'DESC' ? '-' : '' }${field}`
        const query = stringify({
            limit: perPage,
            offset: (page - 1) * perPage,
            ordering: `${order === 'DESC' ? '-' : '' }${field}`,
            ...params.filter,

        })

        console.log('Getting MANY REFERENCES', params)
        return new Promise((resolve, reject) => {
            const allData = []
            axiosInstance(`/${resource}?${query}`).then(({ data }) => ({
                data: data
            }))
            .then(({ data }) => resolve({ data: data.results, total: data.total }) )
        
            
        });

    },

    update: (resource, params) =>
        axiosInstance({
            url: `/${resource}/${params.id}`,
            method: "patch",
            data: params.data
        }).then(({ data }) => ({ data: data })),

    updateMany: (resource, params) => {
        return new Promise((resolve, reject) => {
            const allData = []
            params.ids.map((id)=>{
                axiosInstance.patch({
                    url: `/${resource}/${params.id}`,
                    data: params.data,
                })                
                .then(({ data }) => allData.push(data) )
            })
            resolve({ data: allData });
        });
    },

    create: (resource, params) =>{
        return axiosInstance({ 
            method: "post", 
            url: `/${resource}`, 
            data: params.data, 
            headers: { "Content-Type": "application/json" } 
        })
            .then(({ data, status, statusText }) => ({
                    data: { ...params.data, id: data.id },
                    status: status,
                    statusText: statusText
            }))
    },

    delete: (resource, params) =>
        axiosInstance.delete(`/${resource}/${params.id}`).then(({ data }) => ({ data: data })),

    deleteMany: (resource, params) => {
        return new Promise((resolve, reject) => {
            params.ids.map((id)=>{
                axiosInstance.delete(`/${resource}/${id}`)
            })
            resolve({ data: params.ids });
        });

        // const query = {
        //     filter: JSON.stringify({ id: params.ids}),
        // };
        // return axiosInstance({
        //     url: `/${resource}?${stringify(query)}`,
        //     method: 'DELETE',
        //     params: JSON.stringify(params.data),
        // }).then(({ json }) => ({ data: json }));
    },
    setManager: ({id, user_id}) => axiosInstance(`/warehouses/${id}/add-manager?user_id=${user_id}`)
        .then(({ data }) => ({
            data: data,
        })),
};