class Solution {
    public:
        long long countFairPairs(vector<int>& nums, int lower, int upper) {
            long long ans=0;
            int n=nums.size();
            sort(nums.begin(), nums.end());
            for(int i=0;i<nums.size();i++){
                int s=i+1,e=n-1;
                while(s<=e)
                {
                    int mid=(s+e)/2;
                    if(nums[i]+nums[mid]>lower)
                        e=mid-1;
                    else
                        s=mid+1;
                }
                int l=s;
                s=i+1,e=n-1;
                while(s<=e)
                {
                    int mid=(s+e)/2;
                    if(nums[i]+nums[mid]>=upper)
                        e=mid-1;
                    else
                        s=mid+1;
                }
                int r=e;
                if(l<=r)
                    ans+=r-l+1;
            }
            
            return ans; 

        }
    };