# Serverless backend with ALB 
serverless framework with a load balancer (with vpc/subnet configuration) connected to a lambda in aws.

- creates a LoadBalancer, HTTP Listener and Lambda
- links the Listener and Lambda
- stores the LoadBalancerDNSName (url) in ParameterStore
![](https://api-alb-lambda.s3.amazonaws.com/aws-alb-lambda.svg)
https://api-alb-lambda.s3.amazonaws.com/aws-alb-lambda.svg

## Install Requirements
```
npm install serverless -g
npm install
```

## Modify Config
Modify the file **/config/serverless.config.yml** 
- VPC / Subnet configuration for load balancer
- Scheme for load balancer 

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
