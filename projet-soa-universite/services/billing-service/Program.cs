using ServiceFacturation.Services;
using SoapCore;
using System.ServiceModel;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSoapCore();
builder.Services.AddSingleton<IFacturationService, FacturationService>();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.UseSoapEndpoint<IFacturationService>(options =>
    {
        options.Path = "/FacturationService.svc";
        options.SoapSerializer = SoapSerializer.DataContractSerializer;
    });
});

app.Run();
