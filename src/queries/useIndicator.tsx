import indicatorApiRequest from '@/requests/indicator'
import { DashboardIndicatorQueryParamsType } from '@/validations/indicator.schema'
import { useQuery } from '@tanstack/react-query'

export const useDashboardIndicator = (
  queryParams: DashboardIndicatorQueryParamsType
) => {
  return useQuery({
    queryFn: () => indicatorApiRequest.getDashboardIndicators(queryParams),
    queryKey: ['dashboardIndicators', queryParams]
  })
}
