package com.example.rpenco.euromillions;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView myWebView = (WebView) findViewById(R.id.webView);
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        //myWebView.loadUrl("http://192.168.1.25:8080");
        //myWebView.loadUrl("file:///android_asset/index.html");

        String html = getHtmlFromAsset();
        myWebView.loadData(html, "text/html", "utf-8");
    }
    /**
     * Gets html content from the assets folder.
     */
    private String getHtmlFromAsset() {
        InputStream is;
        StringBuilder builder = new StringBuilder();
        String htmlString = null;
        try {
            is = getAssets().open("index.html");
            if (is != null) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(is));
                String line;
                while ((line = reader.readLine()) != null) {
                    builder.append(line);
                }

                htmlString = builder.toString();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return htmlString;
    }
}
