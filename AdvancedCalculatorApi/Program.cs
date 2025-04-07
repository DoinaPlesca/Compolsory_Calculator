using Shared.Services;
using Microsoft.FeatureManagement;
using Shared.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CalculatorService from Shared
builder.Services.AddScoped<CalculatorService>();

// Add Feature Management
builder.Services.AddFeatureManagement();

// Add Database Context
builder.Services.AddDbContext<CalculatorDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();