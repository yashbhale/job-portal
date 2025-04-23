#include<bits/stdc++.h>
using namespace std;

vector<int> interchange(vector<int> arr)
{
    vector<int> answer;
    int n=arr.size();
    vector<int> b(n,0);
    for(int i=0;i<n;i++)
    {
        b[arr[i]]=i;
    }
    return b;
}

int main()
{
    vector<int> a={7,6,5,4,0,1,2,3};
    vector<int> b= interchange(a);
    for(int i=0;i<b.size();i++)
    {
        cout<<b[i]<<" ";
    }
}