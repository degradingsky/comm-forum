import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// const servers = [
//   {
//     url: 'test-uri',
//     description: 'Test',
//   },
// ];

export function setUpSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle("Forum Service")
    .setDescription(
      "Forum Service handles creation of forums and discussion/comments within the forum",
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
      },
      "bearerAuth",
    )
    .addSecurityRequirements("bearerAuth")
    .setContact("Rishu Anand", "-", "anand.rishu07@gmail.com");

  const config = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("swagger", app, document, {
    jsonDocumentUrl: "swagger.json",
    yamlDocumentUrl: "swagger.yaml",
  });
}
