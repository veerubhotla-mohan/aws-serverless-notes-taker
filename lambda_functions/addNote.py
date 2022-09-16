import os
import boto3
dynamodb = boto3.resource('dynamodb')

notesTable = dynamodb.Table(os.environ['dynamodbTable'])


def lambda_handler(event, context):
    print(event)
    notesTable.put_item(Item={
        "username": event["username"],
        "creation_timestamp": event["creation_timestamp"],
        "note": event["note"]
    })
    return {
        'statusCode': 200,
    }
