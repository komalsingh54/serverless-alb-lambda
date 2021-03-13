# serverless-load-balancer
serverless framework sample that shows how to deploy a load balancer (with vpc/subnet configuration) connected to a lambda in aws.

- creates a LoadBalancer, HTTP Listener and Lambda
- links the Listener and Lambda
- stores the LoadBalancerDNSName (url) in ParameterStore

This feature has been introduced in v 1.45 and extended in 1.46 serverless framework
- [see changelog](https://github.com/serverless/serverless/blob/master/CHANGELOG.md#1450-2019-06-12)


**when to use load balancer instead of api gateway ?**
- https://serverless-training.com/articles/save-money-by-replacing-api-gateway-with-application-load-balancer/
- https://serverless-training.com/articles/api-gateway-vs-application-load-balancer-technical-details/

## Install Requirements
```
npm install serverless -g
npm install
```

## Modify Config
Modify the file **/config/serverless.config.yml** 
- VPC / Subnet configuration for load balancer
- Scheme for load balancer ([see aws documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html#load-balancer-scheme))
```yaml
    VPC_ID: 'vpc-xxxxxxxxx'
    SUBNET_ID_A: "subnet-xxxxxxxxx"
    SUBNET_ID_B: "subnet-xxxxxxxxx"
    SUBNET_ID_C: "subnet-xxxxxxxxx"
    SCHEME: "internet-facing" or "internal" # load balancer scheme - 
```

## Deploy solution
```
sls deploy
```

## Result:
1. Execute info to get load balancer url
```
sls info -v
```

you should get the full output containing the load balancer url.
<pre><code>
Stack Outputs
LoadBalancerDNSName: <b>serverless-load-balancer-258977035.eu-central-1.elb.amazonaws.com</b>
HandlerLambdaFunctionQualifiedArn: arn:aws:lambda:eu-central-1:368555349508:function:serverless-load-balancer-dev-handler:1
ServerlessDeploymentBucketName: serverless-load-balancer-serverlessdeploymentbuck-16pgpyls1225e
</code></pre>


2. Paste the LoadBalancerDNSName Value into your browser or execute postman to set a GET statement against the URL.

#### Expected Response:
```
    Successfully executed lambda call via loadbalancer
```

## Additional things to know

- This sample does not care if the lambda and the load balancer are both in a vpc. It could be mixed in anyway dependent of the use case

- The load balancer url will be stored as Parameter in Parameter store. This helps to reference the loadbalancer url easily tool-independent in other stacks.
