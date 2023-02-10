package com.data_transfer_service.repository;

import com.data_transfer_service.model.ModelSimplify;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.QueryApi;
import com.influxdb.query.FluxTable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Stream;

@Repository
public class InfluxRepository {

    //    String token = "PD-05e6aCOf_Yovo9olKk8U9tfUUkeyHv7irlRp6woJ6TMPUi0kORVle4oUPLzlbOk4JdbWOlXSGB3bKg4L19Q==";
//    String bucket = "rabbitmq_CANdata";
//    String org = "sercel";
//    String url = "http://10.29.150.46:8086";
    @Value("${influx.token}")
    String token;
    @Value("${influx.bucket}")
    String bucket;
    @Value("${influx.org}")
    String org;
    @Value("${influx.url}")
    String url;

    public void testInfluxdb() {
        InfluxDBClient client = InfluxDBClientFactory.create(url, token.toCharArray());
        String flux = "from(bucket:\"sercel\") |> range(start: -1h)";

        final QueryApi queryApi = client.getQueryApi();
        queryApi.query(flux);
        client.close();
    }

    public List<FluxTable> readData(Date startDate, Date endDate, List<ModelSimplify> model, Map<String, List<String>> parameters) {
        StringBuilder fluxBuilder = new StringBuilder();
        fluxBuilder.append(String.format("from(bucket:\"%s\")", bucket));

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

        if (startDate != null) {
            fluxBuilder.append(String.format(" |> range(start: %s",
                    sdf.format(startDate)));
            if (endDate != null) {
                fluxBuilder.append(String.format(",stop: %s)",
                        sdf.format(endDate)));
            } else
                fluxBuilder.append(")");
        }
        // If the date is null, ask for no time limitation
        else
            fluxBuilder.append(" |> range(start: 0)");
        if (model != null && model.size() > 0) {
            fluxBuilder.append(" |> filter(fn: (r) => ");
            for (int i = 0; i < model.size(); i++) {
                fluxBuilder.append(String.format("r[\"gatewayId\"] == \"%s\"", model.get(i).modelId));
                if (i == model.size() - 1)
                    fluxBuilder.append(")");
                else
                    fluxBuilder.append(" or ");
            }
        }

        ;
        if (parameters != null && parameters.size() > 0) {
            Iterator<String> groups = parameters.keySet().iterator();
            Stream<String> paramsSteam = Stream.empty();
            fluxBuilder.append(" |> filter(fn: (r) => ");
            while (groups.hasNext()) {
                String group = groups.next();
                fluxBuilder.append(String.format("r[\"group\"] == \"%s\"", group));
                paramsSteam = Stream.concat(paramsSteam, parameters.get(group).stream());
                if (groups.hasNext())
                    fluxBuilder.append(" or ");
                else
                    fluxBuilder.append(")");
            }

            List<String> params = paramsSteam.toList();
            fluxBuilder.append(" |> filter(fn: (r) => ");
            for (int i = 0; i < params.size(); i++) {
                fluxBuilder.append(String.format("r[\"_measurement\"] == \"%s\"", params.get(i)));
                if (i == params.size() - 1)
                    fluxBuilder.append(")");
                else
                    fluxBuilder.append(" or ");
            }
        }

        String flux = fluxBuilder.toString();
        InfluxDBClient client = InfluxDBClientFactory.create(url, token.toCharArray());
        final QueryApi queryApi = client.getQueryApi();
        final List<FluxTable> result = queryApi.query(flux, org);
        return result;
    }
}
