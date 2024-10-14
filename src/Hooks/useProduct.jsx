import React from 'react'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'

//custom Hook

export default function useProduct() {
    function getProducts(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
  
    let productInfo = useQuery ({
      queryKey: ["recentProduct"],
      queryFn: getProducts,
      staleTime: 10000,
      //retry:4,
    //   retryDelay: 2000,
    //   refetchInterval: 2000,
    //   refetchIntervalInBackground: true,
    //   refetchOnWindowFocus: true,
    //   gcTime: 4000,
    //   select: (data) => data.data.data.filter((product) => product.category.name == "elc"),
    });
    return productInfo
}