# Deployment guide for client side <!-- omit in toc -->

- [How to transfer image to different network](#how-to-transfer-image-to-different-network)
- [How to upload image](#how-to-upload-image)
- [Deployment for sharepoint backend](#deployment-for-sharepoint-backend)
- [Deployment for dedicated backend](#deployment-for-dedicated-backend)

<br>
NOTE: any secrets (like certificate files, authentication...) should be handled by openshift.<br>
Do not copy any secrets to an image directly, it is a security concern and it also makes certain things more complicated.

## How to transfer image to different network
  1. Run `docker save -o "<filepath>.tar" "<tag>"`
  2. Transfer the tar file created by the previous command
  3. Run `docker load -i "<filepath>.tar"` on the machine the tar has been transferred to

## How to upload image
1. Tag image for the appropriate docker registry:<br>
   `docker tag "<tag>" "<registry>/<tag>"` (if uploading to docker hub, instead of registry, specify username).<br>the registry's site usually tells you how to tag images
2. Run `docker push "<registry>/<tag>"`
3. If an appropriate image stream exists on openshift (ask devops) run `oc import-image "<image-stream-tag>"`. Note, you must be logged in to openshift.

## Deployment for sharepoint backend
Since there is no backend, the DAL (data acces layer) will be different for each network.<br>
Thus the DAL is going to be developed seperately on each network and must be incorporated into the project.<br>
Since the DAL is not included in the original build, the DAL must be declared as a namespace in a .d.ts file like so:
```ts
declare namespace DAL {
    ...
}
```
The html file must also include a reference to the dal's js file.<br>
every target network should have a DAL project in typescript, the project should have an implementation of the DAL, like so:
```ts
namespace DAL {
    ...
}
```
The project should build to a single js file with a consistent name (can be done using webpack).<br>
The project should also have a `Dockerfile` based on the ui image from the registry that builds the DAL and then copies the DAL to the appropriate location like so:
```dockerfile
# stage one, build the DAL
FROM <registry>/node as Build 

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY tsconfig.json /app/

COPY ./src/ /app/src

RUN npm run build

#copy the build output to the image
#you might want to copy additional configuration files to the image, 
#do not use this stage to copy any secrets, secrets are handled by openshift
FROM <registry>/<ui-image-tag>
COPY --from=Build /app/build /app/content/
```
<br><br>
### Build steps: <!-- omit in toc -->
1. Run `docker build -t "<ui-image-tag>" .`
2. Transfer the image (unless image is already on the target network)
3. On the target network, upload the image, without updating openshift
4. Go to the DAL project, build the docker image
5. Upload the new image you built in the previous step and update the openshift image stream

## Deployment for dedicated backend
Since we have a dedicated backend, the frontends don't have to be different between the networks, this greatly simplifies deployment:
##
1. Build image
2. Transfer image to target networks
3. Upload image, notify openshift