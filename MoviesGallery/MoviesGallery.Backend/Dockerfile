#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["MoviesGallery.Backend/MoviesGallery.Backend.csproj", "MoviesGallery.Backend/"]
RUN dotnet restore "MoviesGallery.Backend/MoviesGallery.Backend.csproj"
COPY . .
WORKDIR "/src/MoviesGallery.Backend"
RUN dotnet build "MoviesGallery.Backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MoviesGallery.Backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MoviesGallery.Backend.dll"]