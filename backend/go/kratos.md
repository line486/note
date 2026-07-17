# Kratos 框架

> [!NOTE]
>
> - [Kratos 官方文档](https://go-kratos.dev/)
> - [Kratos GitHub 仓库](https://github.com/go-kratos/kratos)
> - [微服务架构设计模式](https://microservices.io/)

## 1. 概述

Kratos 是 Bilibili 开源的一个 Go 语言微服务框架，专注于构建高性能、可扩展的微服务应用。它提供了丰富的功能模块，包括服务发现、配置管理、日志、监控、链路追踪等，帮助开发者快速构建和部署微服务。

## 2. 核心特性

- **模块化设计**: 提供丰富的模块，如 HTTP、gRPC、配置、日志等。
- **高性能**: 基于 Go 语言的高性能特性，支持高并发。
- **服务发现**: 集成 Consul、Etcd 等服务发现工具。
- **配置管理**: 支持多种配置源，如文件、环境变量、远程配置中心。
- **监控与追踪**: 集成 Prometheus、Jaeger 等监控和追踪工具。
- **插件化**: 支持自定义插件，方便扩展功能。

## 3. 安装与配置

```bash
go get -u github.com/go-kratos/kratos/v2
```

## 4. 创建服务

- **初始化项目**

```bash
kratos new helloworld
cd helloworld
```

- **项目结构**

```
helloworld/
├── api/
│   └── helloworld/
│       └── v1/
│           ├── helloworld.proto
│           └── helloworld.pb.go
├── cmd/
│   └── helloworld/
│       └── main.go
├── configs/
│   └── config.yaml
├── internal/
│   ├── biz/
│   ├── data/
│   ├── service/
│   └── conf/
└── go.mod
```

- **定义 Proto 文件**

```proto
syntax = "proto3";

package helloworld.v1;

option go_package = "github.com/go-kratos/kratos/examples/helloworld/helloworld/v1";

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```

- **生成代码**

```bash
kratos proto client api/helloworld/v1/helloworld.proto
kratos proto server api/helloworld/v1/helloworld.proto
```

- **实现服务**

```go
package service

import (
    "context"
    "github.com/go-kratos/kratos/v2/log"
    pb "github.com/go-kratos/kratos/examples/helloworld/helloworld/v1"
)

type GreeterService struct {
    pb.UnimplementedGreeterServer
    logger *log.Helper
}

func NewGreeterService(logger log.Logger) *GreeterService {
    return &GreeterService{
        logger: log.NewHelper(logger),
    }
}

func (s *GreeterService) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
    s.logger.Infof("Received: %v", req.GetName())
    return &pb.HelloReply{Message: "Hello " + req.GetName()}, nil
}
```

- **启动服务**

```go
package main

import (
    "github.com/go-kratos/kratos/v2"
    "github.com/go-kratos/kratos/v2/log"
    "github.com/go-kratos/kratos/v2/transport/grpc"
    "github.com/go-kratos/kratos/examples/helloworld/internal/service"
)

func main() {
    logger := log.NewStdLogger(log.WithPrefix("helloworld"))

    grpcSrv := grpc.NewServer(
        grpc.Address(":9000"),
        grpc.Logger(logger),
    )

    pb.RegisterGreeterServer(grpcSrv, service.NewGreeterService(logger))

    app := kratos.New(
        kratos.Name("helloworld"),
        kratos.Version("v1.0.0"),
        kratos.Logger(logger),
        kratos.Server(grpcSrv),
    )

    if err := app.Run(); err != nil {
        log.Fatal(err)
    }
}
```

## 5. 配置管理

- **定义配置文件**

```yaml
server:
  http:
    addr: ":8000"
  grpc:
    addr: ":9000"
```

- **加载配置**

```go
package conf

import (
    "github.com/go-kratos/kratos/v2/config"
    "github.com/go-kratos/kratos/v2/config/file"
)

type Config struct {
    Server *Server `yaml:"server"`
}

type Server struct {
    HTTP *HTTP `yaml:"http"`
    GRPC *GRPC `yaml:"grpc"`
}

type HTTP struct {
    Addr string `yaml:"addr"`
}

type GRPC struct {
    Addr string `yaml:"addr"`
}

func Load() (*Config, error) {
    c := config.New(
        config.WithSource(
            file.NewSource("configs/config.yaml"),
        ),
    )
    defer c.Close()

    var cfg Config
    if err := c.Load(); err != nil {
        return nil, err
    }
    if err := c.Scan(&cfg); err != nil {
        return nil, err
    }
    return &cfg, nil
}
```

- **使用配置**

```go
func main() {
    cfg, err := conf.Load()
    if err != nil {
        log.Fatal(err)
    }

    grpcSrv := grpc.NewServer(
        grpc.Address(cfg.Server.GRPC.Addr),
        grpc.Logger(logger),
    )
}
```

## 6. 日志

- **使用日志**

```go
logger := log.NewStdLogger(log.WithPrefix("helloworld"))
log.NewHelper(logger).Info("Starting server...")
```

- **自定义日志**

```go
logger := log.NewStdLogger(
    log.WithPrefix("helloworld"),
    log.WithLevel(log.LevelInfo),
    log.WithFormatter(log.JSONFormatter),
)
```

## 7. 监控与追踪

- **集成 Prometheus**

```go
import (
    "github.com/go-kratos/kratos/v2/middleware/metrics"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
    httpSrv := http.NewServer(
        http.Address(":8000"),
        http.Middleware(
            metrics.Server(),
        ),
    )

    httpSrv.Handle("/metrics", promhttp.Handler())
}
```

- **集成 Jaeger**

```go
import (
    "github.com/go-kratos/kratos/v2/middleware/tracing"
    "go.opentelemetry.io/otel/exporters/trace/jaeger"
    "go.opentelemetry.io/otel/sdk/trace"
)

func main() {
    exporter, err := jaeger.NewRawExporter(
        jaeger.WithCollectorEndpoint("http://localhost:14268/api/traces"),
    )
    if err != nil {
        log.Fatal(err)
    }

    tp := trace.NewTracerProvider(
        trace.WithBatcher(exporter),
    )

    httpSrv := http.NewServer(
        http.Address(":8000"),
        http.Middleware(
            tracing.Server(),
        ),
    )
}
```

## 8. 服务发现

- **集成 Consul**

```go
import (
    "github.com/go-kratos/kratos/v2/registry"
    "github.com/go-kratos/kratos/v2/registry/consul"
)

func main() {
    consulClient, err := api.NewClient(api.DefaultConfig())
    if err != nil {
        log.Fatal(err)
    }

    reg := consul.New(consulClient)

    app := kratos.New(
        kratos.Name("helloworld"),
        kratos.Registrar(reg),
    )
}
```

## 9. 最佳实践

- **模块化设计**: 将业务逻辑拆分为多个模块，便于维护和扩展。
- **统一配置管理**: 使用配置中心管理配置，支持动态更新。
- **监控与日志**: 集成 Prometheus 和 Jaeger，实时监控服务状态。
- **服务发现**: 使用 Consul 或 Etcd 实现服务注册与发现。

## 10. 常见问题与解决方案

- **服务启动失败**: 检查端口是否被占用，配置是否正确。
- **性能瓶颈**: 使用性能分析工具定位瓶颈，优化代码。
- **调试困难**: 使用日志和追踪工具，帮助定位问题。
